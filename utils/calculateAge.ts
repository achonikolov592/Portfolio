export default function CalculateAge(){
    const myBirthday = new Date("2005-11-10");
    const currentDate = new Date();


    const yearDiffernce = currentDate.getFullYear() -  myBirthday.getFullYear();
    const monthDiffernce = currentDate.getMonth() - myBirthday.getMonth();
    const dayDiffernece = currentDate.getDay() - myBirthday.getDay();

    if (monthDiffernce > 0){
        return yearDiffernce;
    }else if (monthDiffernce == 0){
        if (dayDiffernece >= 0){
            return yearDiffernce;
        }else{
            return yearDiffernce - 1;
        }
    }else{
        return yearDiffernce - 1;
    }
    
}