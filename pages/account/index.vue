<template>
    <div>
        <h1>Accounts</h1>

        <database-table 
            :form-fields="['name', 'balance', 'bank']"
            table="account"
        ></database-table>
    </div>
</template>