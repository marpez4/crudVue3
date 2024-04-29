<template>
    <div class="container my-5">
        <h1 class="mb-5">Gestión de Usuarios</h1>

        <!-- Formulario para crear un nuevo usuario -->
        <div class="card mb-5">
            <div class="card-body">
                <h2 class="card-title">Crear Nuevo Usuario</h2>
                <form @submit.prevent="crearUsuario">
                    <div class="mb-3">
                        <label for="nombreUsuario" class="form-label">Nombre completo</label>
                        <input id="nombreUsuario" v-model="nuevoUsuario.nombre" type="text"
                            placeholder="Introduce el nombre del usuario" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="emailUsuario" class="form-label">Email</label>
                        <input id="emailUsuario" v-model="nuevoUsuario.email" type="email"
                            placeholder="Introduce un email" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input id="password" v-model="nuevoUsuario.password" type="password" placeholder="Password"
                            class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">Crear usuario</button>
                </form>
            </div>
        </div>

        <!-- Tabla de listado de usuarios -->
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.password }}</td>
                    <td>
                        <button @click="editarUsuario(usuario)" class="btn btn-sm btn-info mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button @click="eliminarUsuario(usuario.id)" class="btn btn-sm btn-danger">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal para editar un usuario existente -->
        <div class="modal fade" id="editModalUsuario" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
            aria-hidden="true" v-if="usuarioEditando">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Editar Usuario</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar"
                            @click="cancelarEdicion">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="guardarUsuario">
                            <div class="mb-3">
                                <label for="editNombre" class="form-label">Nombre</label>
                                <input id="editNombre" v-model="usuarioEditando.nombre" type="text"
                                    class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="editEmail" class="form-label">Email</label>
                                <input id="editEmail" v-model="usuarioEditando.email" type="text" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="editPassword" class="form-label">Password</label>
                                <input id="editPassword" v-model="usuarioEditando.password" type="text"
                                    class="form-control" :disabled="isDisabled">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click="cancelarEdicion">Cerrar</button>
                        <button type="submit" class="btn btn-success" @click="guardarUsuario">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Modal } from 'bootstrap';
import bcrypt from 'bcryptjs'

export default {
    name: 'UsuariosComponent',
    data() {
        return {
            usuarios: [],
            nuevoUsuario: {
                nombre: '',
                email: '',
                password: '',
            },
            isDisabled: true,
            usuarioEditando: null,
            modalInstance: null,  // Referencia al objeto Modal
        };
    },
    mounted() {
        this.obtenerUsuarios();
    },
    methods: {
        async obtenerUsuarios() {
            try {
                const respuesta = await this.$http.get('http://localhost:3000/api/usuarios');
                this.usuarios = respuesta.data;
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        },
        async crearUsuario() {
            try {
                // Encripta la contraseña
                const salt = await bcrypt.genSalt(10)
                this.nuevoUsuario.password = await bcrypt.hash(this.nuevoUsuario.password, salt);

                const respuesta = await this.$http.post('http://localhost:3000/api/usuarios', this.nuevoUsuario);

                this.usuarios.push(respuesta.data);
                this.nuevoUsuario = { nombre: '', email: '', password: '' };
            } catch (error) {
                console.error('Error al crear usuario:', error);
            }
        },
        editarUsuario(usuario) {

            this.usuarioEditando = null;
            this.usuarioEditando = usuario;
            this.modalInstance = null;

            this.$nextTick(() => {
                if (!this.modalInstance) {
                    const modalElement = document.getElementById('editModalUsuario');
                    if (modalElement) {
                        this.modalInstance = new Modal(modalElement);
                    }
                }
                if (this.modalInstance) {
                    this.modalInstance.show();
                }
            });
        },
        async guardarUsuario() {
            try {
                const respuesta = await this.$http.put(`http://localhost:3000/api/usuarios/${this.usuarioEditando.id}`, this.usuarioEditando);
                const index = this.usuarios.findIndex(p => p.id === respuesta.data.id);
                this.usuarios.splice(index, 1, respuesta.data);
                this.usuarioEditando = null;
                this.modalInstance.hide();

            } catch (error) {
                console.error('Error al guardar cambios:', error);
            }
        },
        cancelarEdicion() {
            this.usuarioEditando = null;
            this.modalInstance.hide();
        },
        async eliminarUsuario(id) {
            try {
                await this.$http.delete(`http://localhost:3000/api/usuarios/${id}`);
                this.usuarios = this.usuarios.filter(p => p.id !== id);
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
            }
        },
    },
};
</script>
<style scoped>
.modal-header {
    justify-content: space-between !important;
}

.container {
    max-width: 800px;
    /* Limita el ancho para una lectura más cómoda */
}

.card {
    background: #f8f9fa;
    border: 1px solid #e1e4e8;
}

.form-label {
    font-weight: bold;
}

.modal-backdrop.show {
    /* Este estilo asegura que el fondo se difumine cuando el modal esté activo */
    opacity: 0.5 !important;
}
</style>
