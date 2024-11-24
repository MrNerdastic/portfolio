const nodemailer = require("nodemailer");

export default async function (req, res) {
    if (req.method === "POST") {
        const { name, email, message } = req.body;

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.example.com", // Replace with your SMTP server
            port: 587,
            secure: false,
            auth: {
                user: "your-email@example.com", // Replace with your email
                pass: "your-email-password",   // Replace with your email password
            },
        });

        try {
            // Send the email
            await transporter.sendMail({
                from: `"${name}" <${email}>`, // Sender's info
                to: "example@example.com",    // Replace with your email
                subject: `Contact Form Submission from ${name}`,
                text: message,
            });

            res.status(200).json({ success: true, message: "Email sent successfully." });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
