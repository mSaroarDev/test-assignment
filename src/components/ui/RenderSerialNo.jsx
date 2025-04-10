
const RenderSerialNo = ({ value }) => {
  return (
    <>
      <p
        className="bg-brand/10 text-brand"
        style={{
          padding: "5px 10px",
          borderRadius: "5px",
          textTransform: "uppercase",
          fontSize: "12px",
          fontWeight: "600",
        }}>{value}</p>
    </>
  );
};

export default RenderSerialNo;