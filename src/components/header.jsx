const Header = ({ profile }) => {
  const { first, last } = profile;
  return (
    <header>
      <nav className="w3-bar w3-black">
        <h1 className="w3-bar-item w3-text-amber">{`${first} ${last}`}</h1>
      </nav>
    </header>
  );
};

export default Header;
