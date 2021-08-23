<template>
  <header>
    <nuxt-link to="/">
      <Ant ref="logo" height="32" @click="headShake()" />
    </nuxt-link>
    <nuxt-link to="/accounts">Accounts</nuxt-link>
    <nuxt-link to="/banks">Banks</nuxt-link>
    <nuxt-link to="/transactions">Transactions</nuxt-link>
  </header>
</template>