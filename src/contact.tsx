
import emailjs from 'emailjs-com';

const SERVICE_ID = "service_ke6u0i9";
const TEMPLATE_ID = "template_p42jdck";
const PUBLIC_KEY = "gkbm64MKEgVjRDpIz";

const Contact = () => {
    const handleOnSubmit = (e: { preventDefault: () => void; target: string | HTMLFormElement; }) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
          .then((result) => {
            console.log(result.text);
            alert('Message Sent Successfully')
          }, (error) => {
            console.log(error.text);
            alert('Something went wrong!')
          });
        if (e.target instanceof HTMLFormElement) {
          e.target.reset();
        }
      };

  return (
      <div style={{width:'100vw', height: '100vh', display:'flex'}}>
          <form className="formContainer" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleOnSubmit(e as unknown as { preventDefault: () => void; target: string | HTMLFormElement; })}>
              <h2 className="text-center">Send me a message. Let's have a chat!</h2>
              <br />
              <div className="formElement">
                  <label htmlFor="from_name">Name</label>
                  <input type="text" id="from_name" name="from_name" placeholder="Your name.." required />
              </div>

              <div className="formElement">
                  <label>E-mail</label>
                  <input type="email" id="from_email" name="from_email" placeholder="Your email.." required />
              </div>

              <div className="formElement">
                  <label htmlFor="message">Message</label>
                  <textarea id="from_message" name="from_message" rows={8} cols={30} placeholder="Your message.." required />
              </div>
              <button type='submit' className="formButton">Submit</button>
          </form>
      </div>
  )
}

export default Contact;