interface PropType {
  backgroundImage: string;
}
export default function BgImg(prop: PropType) {
  return (
    <div
      className="bg-fixed bg-cover bg-no-repeat w-screen min-h-screen contrast-50 absolute z-0"
      style={prop}
    ></div>
  );
}
