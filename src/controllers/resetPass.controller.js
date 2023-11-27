import { updatePass, verifyExists } from "./user.controller.js";
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import User from "../models/user.model.js";

export const resetPass = async(req, res) => {
  try {
    const {email} = req.query
    const user = await verifyExists(email)
    if(user) {
      const tokenResetPass = uuidv4()
      user.tokenResetPass = tokenResetPass
      user.save()
      setTimeout(() => {
        user.tokenResetPass = ''
        user.save()
      }, 600000);
      //** ENVIO DE EMAIL **/
      sendEmail(user)
      res.status(200).send({success: true, msg: "Verifique su email en el cual debera seguir los pasos para restaurar su clave."})
    } else{
      res.status(400).send({msg: "El mail ingresado no es valido", success: false})
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

const sendEmail = (user) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'contactofundacionimcejysacej@gmail.com',
        pass: 'mysb ffnp fwwh nssi'
      }
    })
    const mailOptions = {
      from: 'contactofundacionimcejysacej@gmail.com',
      to: user.email,
      subject: 'Restablecer Contraseña',
      html:`<div>
      <h3 className='py-3'>Hola ${user.name} ${user.surname}!</h3>
      <p className='pb-1'>Para restablecer su contraseña haz click en el siguiente link: https://virgendesalta.netlify.app/admin/resetear-clave/${user.email}/${user.tokenResetPass}</p>
      <p className='pb-1'>Token: <strong>${user.tokenResetPass}</strong></p>
      <p className='pb-1'>Tenga en cuenta que el token enviado tiene una validez de 10 minutos, una vez vencido, deberá realizar el proceso nuevamente</p>
      <p className='py-3'>Atentamente, la administración</p>
      <p className='pt-5'>Sitio Oficial del Santuario de las Apariciones de la Santísima Virgen María y de Nuestro Señor Jesucristo</p>
      </div>`,
    }
    transporter.sendMail(mailOptions, (err, info)=> {
      if(err) {
        console.log(err)
      } else {
        console.log(info.response)
      }
    })
}

export const updatePassReset = async(req, res) => {
  try {
    const body = req.body
    const { email } = req.params
    console.log(body)
    
    const user = await verifyExists(email)
    if(user && user.tokenResetPass === body.token) {
      console.log(email)
      body.password = await bcrypt.hash(body.password, 8)
      const updated = await User.findOneAndUpdate({email: email}, body, {new: true})
      console.log(updated)

      const updatePassExpiration = new Date()
      updatePassExpiration.setDate(updatePassExpiration.getDate() + 60)
      updated.passExpiration = updatePassExpiration
      updated.tokenResetPass = ''
      updated.lastPassIncorrect = ''
      await updated.save()
      res.status(200).json({message: 'Clave restaurada con exito'})
    } else {
      res.status(400).json({message: 'Token ingresado incorrecto o no válido'})
    }

  } catch (error) {
    res.status(500).send({msg: 'Error en el servidor. Recargue e intente nuevamente', success: false })
  }
}