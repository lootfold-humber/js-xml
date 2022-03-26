const Profile = ({ profile }) => {
  const { first, about, photo } = profile;
  return (
    <section className="w3-row w3-center w3-padding w3-light-grey">
      <div className="w3-col l6 intro">
        <div className="w3-container">
          <h2 id="intro" className="w3-center">{`Hi I'm ${first}`}</h2>
        </div>
        <div className="w3-container">
          <p id="intro-text" className="w3-center">
            {about}
          </p>
        </div>
      </div>
      <div className="w3-col l6">
        <img className="w3-round profile-img" alt="profile" src={photo} />
      </div>
    </section>
  );
};

export default Profile;
