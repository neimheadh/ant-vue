<template>
  <header>
    <nuxt-link to="/">
      <Ant ref="logo" height="32" @click="headShake()" />
    </nuxt-link>
    <nuxt-link to="/account">Accounts</nuxt-link>
    <nuxt-link to="/bank">Banks</nuxt-link>
    <nuxt-link to="/transaction">Transactions</nuxt-link>
  </header>
</template>