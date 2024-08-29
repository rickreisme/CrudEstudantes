<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>Editar Estudante</h3>
      </div>

      <form class="card-body container mt-3">
        <div class="mb-3">
          <label for="nome">Nome</label>
          <input
            type="text"
            v-model="model.estudante.nome"
            id="nome"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="curso">Curso</label>
          <input
            type="text"
            v-model="model.estudante.curso"
            id="curso"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="email">E-mail</label>
          <input
            type="text"
            v-model="model.estudante.email"
            id="email"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="telefone">Celular</label>
          <input
            type="text"
            v-model="model.estudante.telefone"
            id="telefone"
            class="form-control"
            @input="formatNumber"
          />
        </div>

        <div class="d-flex justify-content-between mb-3">
          <button
            type="button"
            @click="editarEstudante"
            class="btn btn-primary"
          >
            Editar
          </button>

          <RouterLink to="/estudantes" class="btn btn-info">
            Voltar
          </RouterLink>
        </div>
      </form>

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

      <div
        v-if="errorMessage"
        class="toast-container position-fixed top-0 end-0 text-center"
      >
        <div
          id="errorToast"
          class="toast bg-danger text-white fs-6 me-3 mt-3 custom-toast"
          role="alert"
        >
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiURL from '../../api.ts'
import { ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { formatPhoneNumber } from '../../utils/formatPhoneNumber'

export default {
  name: 'estudanteEditar',
  setup() {
    const successMessage = ref('')
    const errorMessage = ref('')

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
    return {
      successMessage,
      errorMessage,
      showToast
    }
  },
  data() {
    return {
      estudanteId: '',
      model: {
        estudante: {
          nome: '',
          curso: '',
          email: '',
          telefone: ''
        }
      }
    }
  },
  mounted() {
    this.estudanteId = this.$route.params.id
    this.getEstudanteData(this.$route.params.id)
  },
  methods: {
    getEstudanteData(estudanteId) {
      apiURL
        .get(`/estudantes/${estudanteId}`)
        .then((res) => {
          console.log(res.data.estudante)
          this.model.estudante.nome = res.data.estudante.nome
          this.model.estudante.curso = res.data.estudante.curso
          this.model.estudante.email = res.data.estudante.email
          this.model.estudante.telefone = res.data.estudante.telefone
        })
    },

    isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailPattern.test(email)
    },

    formatNumber() {
      this.model.estudante.telefone = formatPhoneNumber(
        this.model.estudante.telefone
      )
    },

    async editarEstudante() {
      console.log('Dados:', this.model.estudante)

      if (
        !this.model.estudante.nome ||
        !this.model.estudante.curso ||
        !this.model.estudante.email ||
        !this.model.estudante.telefone
      ) {
        this.errorMessage = 'Por favor, preencha todos os campos!'
        this.$nextTick(() => {
          this.showToast('errorToast', this.errorMessage)
        })
        return
      }

      if (!this.isValidEmail(this.model.estudante.email)) {
        this.errorMessage = 'Digite um email válido!'
        this.model.estudante.email = ''
        this.$nextTick(() => {
          this.showToast('errorToast', this.errorMessage)
        })
        return
      }

      try {
        const response = await apiURL.put(
          `/estudantes/${this.estudanteId}/editar`,
          this.model.estudante
        )
        this.successMessage = response.data.message
        this.$nextTick(() => {
          this.showToast('successToast', this.successMessage)
          setTimeout(() => {
            this.$router.push('/estudantes')
          }, 2500)
        })
      } catch (error) {
        console.error('Erro ao adicionar estudante', error)
        this.successMessage = ''
      }
    }
  },
  formatPhoneNumber
}
</script>