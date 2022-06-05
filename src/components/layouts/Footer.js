const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="copyright">
                &copy; Copyright <strong><span>{process.env.REACT_APP_WEB_NAME}</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
                2022
            </div>
        </footer>
    );
}

export default Footer;