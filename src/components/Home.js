export default function Home(props) {
    return (
      <div>
        <h2>Coffee Room</h2>
        <p>Welcome to Coffee Room!</p>
        <p>Here you can hang out virtually and write posts.</p>
        <p>To begin, please either register as a user or login.</p>
        <p>We hope you enjoy your time with us! </p>
        <p>{props.id}</p>
      </div>
    );
  }