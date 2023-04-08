import Swal from "sweetalert2";

export default () => {
  function fire(data:any) {
    Swal.fire(data);
  }

  return {
    fire,
  };
};
