const Spinner = () => {
  return (
      <>
          <div className="loader"></div>
            <style jsx>{`
              .loader {
                width: 20px;
                aspect-ratio: 1;
                border-radius: 50%;
                border: 3px solid white;
                border-right-color: transparent;
                animation: spin 1s infinite linear;
              }
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
            </style>
      </>
  );
};

export default Spinner;