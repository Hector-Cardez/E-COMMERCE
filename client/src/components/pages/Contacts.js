import "../styles/Contacts.css";

function Contacts() {
  return (
    <div className="page-background">
      <div className="contacts">
        <h3 className="titlegetin">Get In Touch</h3>
        <p>
          <strong>Phone: </strong> +1 (800) 555-1234
          <br />
          <strong>Email: </strong>support@sportlab.com
          <br />
          <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM
        </p>
        <h4 className="titllocation">Location:</h4>
        <p>
          <br />
          SportLab, Inc.
          <br />
          7141, Montreal, Quebec, CA
        </p>
        {/* google_map embedded iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22388.637872285446!2d-73.67723482568357!3d45.4581244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9172e1f2873a7%3A0xdc7052006ff9bf92!2sConcordia%20University%20-%20Loyola%20Campus!5e0!3m2!1sen!2sca!4v1723938790711!5m2!1sen!2sca"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SportLab Location"
        />
      </div>
    </div>
  );
}

export default Contacts;
