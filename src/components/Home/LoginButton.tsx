const LoginButton = () => {
  const clickUpAuthorizationBaseUrl = `https://app.clickup.com/api?client_id=${
    import.meta.env.VITE_CLICKUP_CLIENT_ID
  }&redirect_uri=${window.location.origin}`;

  return <a href={clickUpAuthorizationBaseUrl}>Log in</a>;
};
export default LoginButton;
