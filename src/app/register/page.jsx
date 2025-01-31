import Title from "@/components/Title/Title";
import PetBlock from "@/components/PetBlock/PetBlock";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import Link from "next/link";
import styles from "./Register.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <PetBlock
        imgSrc="/img/catbig.png"
        imgAlt="Dog"
        imgWidth={536}
        imgHeight={632}
        miniImgSrc="/img/cat2.png"
        name="Jack"
        birthday="18.10.2021"
        description="Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys."
      />
      <div className={styles.content}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegisterPage;
