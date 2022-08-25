<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <b-container>
            <b-row class="justify-content-center mt-4">
                <b-col col md="6">
                    <b-card
                        header="Log in to your account"
                        header-bg-variant="dark"
                        header-text-variant="white"
                    >
                        <b-card-text>
                            <b-form>
                                <b-form-group
                                    class="mb-4"
                                    description="Enter your login"
                                >
                                    <b-form-input
                                        type="text"
                                        placeholder="Login"
                                        v-model="userLogin"
                                        maxlength="20"
                                        :disabled="showTwoFactorAuth"
                                    />
                                </b-form-group>

                                <b-form-group
                                    class="mb-4"
                                    description="Enter your password"
                                >
                                    <b-form-input
                                        type="password"
                                        placeholder="Password"
                                        v-model="userPassword"
                                        maxlength="20"
                                        :disabled="showTwoFactorAuth"
                                    />
                                </b-form-group>

                                <b-form-group
                                    v-if="showTwoFactorAuth"
                                    class="mb-4"
                                    description="Two-factor Authentication"
                                >
                                    <b-form-input
                                        placeholder="Code"
                                        v-model="twoFactorAuth"
                                        maxlength="20"
                                    />
                                </b-form-group>

                                <b-form-group>
                                    <b-button
                                        v-if="showTwoFactorAuth"
                                        @click="loginUser"
                                        variant="outline-primary"
                                    >
                                        Login
                                    </b-button>
                                    <b-button
                                        v-else
                                        @click="checkLoginAndPassword"
                                        variant="outline-primary"
                                        :disabled="disableContinueButton"
                                    >
                                        Continue
                                    </b-button>
                                </b-form-group>
                            </b-form>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
            <b-alert
                :show="dismissCountDown"
                class="position-fixed fixed-top m-0 rounded-0"
                style="z-index: 2000;"
                :variant="alertVariant"
                @dismiss-count-down="countDownChanged"
            >
                {{alertMessage}}
            </b-alert>
        </b-container>
    </div>
</template>

<script>
const WRONG_DATA_MESSAGE = 'Wrong login or password!';
const WRONG_TWO_FACTOR = 'Wrong Two-factor authentication!';
const SUCCESS = 'All data matched, congratulation!';

export default {
    name: 'LoginForm',
    data() {
        return {
            userLogin: '',
            userPassword: '',
            twoFactorAuth: '',
            showTwoFactorAuth: false,
            alertMessage: false,
            alertVariant: '',
            dismissSecs: 2,
            dismissCountDown: 0
        }
    },
    computed: {
        getUserData() {
            return this.$store.getters['login/getUserData'];
        },
        getTwoFactorAuth() {
            return this.$store.getters['login/getTwoFactorAuth'];
        },
        disableContinueButton() {
            return !this.userLogin.length || !this.userPassword.length;
        }
    },
    methods: {
        countDownChanged(countDown) {
            this.dismissCountDown = countDown;
        },
        checkLoginAndPassword() {
            const { login, password } = this.getUserData;

            if (login === this.userLogin && password === this.userPassword) {
                this.showTwoFactorAuth = true;
            } else {
                this.showAlertMessage(WRONG_DATA_MESSAGE, 'danger');
            }
        },
        loginUser() {
            if (this.getTwoFactorAuth === this.twoFactorAuth) {
                this.showAlertMessage(SUCCESS, 'success');
            } else {
                this.showAlertMessage(WRONG_TWO_FACTOR, 'danger');
            }
        },
        showAlertMessage(message, alertVariant) {
            this.alertVariant = alertVariant;
            this.alertMessage = message;
            this.dismissCountDown = this.dismissSecs;
        }
    }
}
</script>
