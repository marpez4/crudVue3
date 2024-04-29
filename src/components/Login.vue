<template>

    <main class="form-signin w-100 m-auto">
        <form @submit.prevent="loginUsuario">
            <div class="imgCenter">
                <img class="mb-4" src="../assets/logo.png" alt="" width="72" height="57">
            </div>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input type="email" class="form-control" id="email" v-model="usuario.email"
                    placeholder="name@example.com">
                <label for="emailUsuario">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="password" v-model="usuario.password"
                    placeholder="Password">
                <label for="passwordUsuario">Password</label>
            </div>

            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-body-secondary">&copy; MTWAM</p>
        </form>
    </main>

</template>

<script>
import Swal from 'sweetalert2'

export default {
    name: 'LoginComponent',
    data() {
        return {
            usuario: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async loginUsuario() {
            try {
                const respuesta = await this.$http.post('http://localhost:3000/api/usuarios/login', this.usuario);
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Login correcto.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    console.log('Respuesta:', respuesta.data);
                    this.$router.push('/home');
                });

            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Intenta de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    console.error('Error al iniciar sesión:', error);
                });
            }
        }
    }

}
</script>

<style scoped>
html,
body {
    height: 100%;
}

.imgCenter {
    text-align: center;
}

.form-signin {
    max-width: 330px;
    padding: 1rem;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;


}
</style>