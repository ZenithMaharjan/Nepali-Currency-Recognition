const Error = ({ message, style }) => {
  return (
    <div>
      <div class="text-danger" style={style}>
        {message}
      </div>
    </div>
  );
};

export default Error;
