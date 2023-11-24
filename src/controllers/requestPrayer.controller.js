import nodemailer from 'nodemailer'

export const sendRequest = async(req, res) => {
  try {
    const {email, name, requestPrayer} = req.body
    sendEmail(email, name, requestPrayer)
    res.status(200).json({success: true, msg: "Pedido de oración enviado con éxito!"})
  } catch (error) {
    res.status(500).send(error)
  }
}

const sendEmail = async(email, name, requestPrayer) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'contactofundacionimcejysacej@gmail.com',
        pass: 'mysb ffnp fwwh nssi'
      }
    })
    console.log(requestPrayer)
    const arr = requestPrayer.split('\n')
    console.log(arr)
    let textHTML = ``
    arr.forEach((d, i) => {
      textHTML = textHTML + `<p className='pb-2'>${d}</p>`
    })
    
    const mailOptions = {
      from: 'contactofundacionimcejysacej@gmail.com',
      to: 'atapenalba16@gmail.com',
      subject: 'Pedido de oración',
      html:`<div>
      <h3 className='py-3'>Nuevo pedido de oración</h3>
      <h4 className='pb-2'>Datos del pedido</h4>
      <p className='py-2'>Nombre: <span>${name}</span></p>
      <p className='py-2'>Email: <span>${email}</span></p>
      <h4 className='py-2'>Pedido:</h4>
      ${textHTML}
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