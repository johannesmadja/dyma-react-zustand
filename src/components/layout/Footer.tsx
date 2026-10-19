import styles from './Footer.module.scss'

function Footer() {
    return (
        <footer className={`${styles.footer} d-flex justify-content-center align-items-center`}>
            <p>Copyright @ 2026 Cookchef Dyma, Inc.</p>
        </footer>
    )
}

export default Footer;