interface EmailService {
    send: (email: string, title: string, content: string) => Promise<void>;
}

export default EmailService;
