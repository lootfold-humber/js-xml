const Contact = ({ handleSubmit }) => {
  return (
    <section className="w3-center w3-padding">
      <h2 className="heading">Contact Me</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          className="w3-input"
          type="text"
          id="name"
          name="name"
          required
        />
        <input
          placeholder="Email"
          className="w3-input"
          type="email"
          id="email"
          name="email"
          required
        />
        <textarea
          placeholder="Type your message..."
          className="w3-input"
          name="message"
          id="message"
          cols="20"
          rows="10"
        ></textarea>
        <button className="w3-margin-top w3-btn w3-black" type="submit">
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
