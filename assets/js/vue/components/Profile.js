const Profile = {
    template: "#s_profile",
    data() {
        return {
            email: '',
            emailError: '',
            formMessage: '',
        };
    },
    methods: {
        updatePassword() {
            if (!this.email) {
                this.emailError = this.$root.error_messages.requiredEmail;
                return;
            }
            this.$root.auth.sendPasswordResetEmail(this.email)
                .then(() => {
                    this.formMessage = 'E-mail enviado com sucesso';
                })
                .catch((error) => {
                    this.emailError = error.message;
                });
        },
    },
    created() {
        if (!this.$root.user) this.$router.push("/");

        this.email = this.$root.user.email;

        document.title = `${this.$root.default_title} | Perfil`;
    },
    watch: {
        "$root.user": function(user) {
            if (user) {
                this.email = user.email;
            } else {
                this.$router.push("/");
            }
        }
    }
};

export default Profile;