// ApplicationLogo.js

export default function ApplicationLogo(props) {
    return (
        <img
            {...props} // Preserve the props for styling
            src="/images/ApplicationLogo.png" 
            alt="Application Logo"
            className="w-20 h-20 " // Ensure the image has appropriate styling
        />
    );
}
