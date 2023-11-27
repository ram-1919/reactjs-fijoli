
const getregisteredInfo = (whatsapp_number) => {
    return {
      type: "get_registeredInfo",
      data: {"whatsapp_number": whatsapp_number}
    };
  };
  
export default getregisteredInfo;