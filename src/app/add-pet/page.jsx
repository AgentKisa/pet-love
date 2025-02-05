import PetBlock from "@/components/PetBlock/PetBlock";
import styles from "./AddPet.module.css";
import AddPetForm from "@/components/AddPetForm/AddPetForm";

const AddPetPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PetBlock
        imgSrc="/img/dog-add.png"
        imgAlt="Dog"
        imgWidth={512}
        imgHeight={648}
        showPetInfo={false}
      />
      <AddPetForm />
    </div>
  );
};

export default AddPetPage;
