<template>
    <div class="container marketing">
        <div class="mt-4 text-center mb-4">
            <h2>Bienvenido al CRUD con VUE </h2>
        </div>
        <!-- Three columns of text below the carousel -->
        <div class="row text-center">
            <div class="col-lg-6">
                <i class="fas fa-users sizeIcon"></i>
                <h2 class="fw-normal">Usuarios</h2>
                <p></p>
                <p><a class="btn btn-secondary" @click="navegarUsuarios">Ver más &raquo;</a></p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-6">
                <i class="fas fa-gift sizeIcon"></i>
                <h2 class="fw-normal">Productos</h2>
                <p></p>
                <p><a class="btn btn-secondary" @click="navegarProductos">Ver más &raquo;</a></p>
            </div>
        </div><!-- /.row -->
    </div><!-- /.container -->


</template>
<script>
export default {
    name: 'HomeComponent',
    methods: {
        navegarUsuarios() {
            this.$router.push('/usuarios');
        },
        navegarProductos() {
            this.$router.push('/productos');
        }
    }
}
</script>
<style scoped>
.sizeIcon {
    font-size: 150px;
}
</style>
