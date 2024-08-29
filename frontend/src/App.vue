<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/main.css'

const currentYear = new Date().getFullYear()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
        <div class="container-fluid">
          <RouterLink class="navbar-brand mx-auto" to="/"
            >CRUD Estudantes</RouterLink
          >

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" aria-current="page" to="/"
                  >Home</RouterLink
                >
              </li>

              <li class="nav-item">
                <RouterLink class="nav-link" to="/sobre">Sobre</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink class="nav-link" to="/estudantes"
                  >Estudantes</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />

  <footer
    class="text-center d-flex w-100 align-items-center justify-content-between mt-5 px-5 py-2 bg-success text-white"
  >
    <h5 class="m-0">
      {{ currentYear }}
      <a
        class="link-light link-opacity-50-hover text-decoration-none"
        href="https://rickreisme-portfolio.vercel.app"
        target="_blank"
        ><span>&lt;rickreisme/&gt;</span></a
      >
    </h5>

    <h5 class="m-0">Desenvolvido por Rick Reis</h5>
  </footer>
</template>
