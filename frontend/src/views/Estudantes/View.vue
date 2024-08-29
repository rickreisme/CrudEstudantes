<template>
  <div class="card">
    <div class="card-header">
      <h3>
        Lista de Estudantes
        <RouterLink to="/estudantes/criar" class="btn btn-primary float-end">
          Adicionar Estudante
        </RouterLink>
      </h3>
    </div>

    <div class="container">
      <div class="card-body">
        <div class="table-responsive" v-if="estudantes.length > 0">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center fw-bold fs-5">Nome</th>
                <th class="text-center fw-bold fs-5">Curso</th>
                <th class="text-center fw-bold fs-5">E-mail</th>
                <th class="text-center fw-bold fs-5">Celular</th>
                <th class="text-center fw-bold fs-5">Registrado Em</th>
                <th class="text-center fw-bold fs-5">Ação</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(estudante, index) in estudantes" :key="index">
                <td class="text-center">{{ estudante.nome }}</td>
                <td class="text-center">{{ estudante.curso }}</td>
                <td class="text-center">{{ estudante.email }}</td>
                <td class="text-center">{{ estudante.telefone }}</td>
                <td class="text-center">
                  {{ formatDate(estudante.created_at) }}
                </td>
                <td class="text-center">
                  <RouterLink
                    :to="{ path: '/estudantes/' + estudante.id + '/editar' }"
                    class="btn btn-info"
                  >
                    Editar
                  </RouterLink>

                  <button
                    type="button"
                    @click="deleteEstudante(estudante.id)"
                    class="btn btn-danger ms-2"
                    data-bs-togle="modal"
                    data-bs-target="modalExcluir"
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-else-if="!loading && estudantes.length === 0"
          class="text-center"
        >
          <div class="card">
            <div class="card-body">
              <h5>Nenhum estudante foi encontrado</h5>
            </div>
          </div>
        </div>

        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div>
            <h6>Buscando Estudantes...</h6>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="successMessage"
      class="toast-container position-fixed top-0 end-0 text-center"
    >
      <div
        id="successToast"
        class="toast bg-success text-white fs-6 me-3 mt-3 custom-toast"
        role="alert"
      >
        {{ successMessage }}
      </div>
    </div>

    <div class="modal fade" id="modalExcluir" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">
              Tem certeza de quer quer excluir esse estudante?
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../utils/formatDate'
import { ref } from 'vue'
import apiURL from '../../api.ts'
import axios from 'axios'

export default {
  name: 'estudantes',
  setup() {
    const successMessage = ref('')
    const loading = ref(true)
    const estudantes = ref([])

    function showToast(id, message) {
      const toastElemment = document.getElementById(id)

      if (toastElemment) {
        toastElemment.innerHTML = message
        const toast = new bootstrap.Toast(toastElemment, {
          autohide: true,
          delay: 3000
        })
        toast.show()
      }
    }

    async function getEstudantes() {
      loading.value = true
      axios
        .get(`${import.meta.env.VITE_API_URL}/estudantes`)
        .then((res) => {
          estudantes.value = res.data.estudantes || []
        })
        .catch(() => {
          estudantes.value = []
        })
        .finally(() => {
          loading.value = false
        })
    }

    async function deleteEstudante(estudanteId) {
      if (confirm('Você tem certeza de que quer exluir esse estudante?')) {
        axios.delete(`${import.meta.env.VITE_API_URL}/estudantes/${estudanteId}/excluir`).then((res) => {
          successMessage.value = res.data.message
          showToast('successToast', this.successMessage)

          getEstudantes()
        })
      }
    }
    return {
      estudantes,
      successMessage,
      loading,
      showToast,
      getEstudantes,
      deleteEstudante,
      formatDate
    }
  },

  mounted() {
    this.getEstudantes()
  }
}
</script>
