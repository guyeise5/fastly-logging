import CryptoJS from 'crypto-js';

let data: string[] = null;

export const services = (): string[] => {
  if(!data) {
     data = process.env.FASTLY_SERVICES?.split(",")?.map(s => CryptoJS.SHA256(s).toString(CryptoJS.enc.Hex)) || ["*"]
  } 
  console.log(data)  
  return data;
}