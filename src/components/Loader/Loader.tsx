import styles from "./loader.module.css";
const { loaderContainer, loaderAnimation } = styles;

const Loader = () => {
    return (
        <div className={loaderContainer}>
            <div className={loaderAnimation} />
        </div>
    );
}

export default Loader;
