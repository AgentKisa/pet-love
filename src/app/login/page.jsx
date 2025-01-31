import Title from "@/components/Title/Title";
import LoginForm from "@/components/LoginForm/LoginForm";
import Link from "next/link";
import styles from "./Login.module.css";
import PetBlock from "@/components/PetBlock/PetBlock";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <PetBlock
        imgSrc="/img/dog.png"
        imgAlt="Dog"
        imgWidth={515}
        imgHeight={660}
        name="Rich"
        birthday="21.09.2020"
        miniImgSrc="/img/pappy.png"
        description="Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"
      />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
