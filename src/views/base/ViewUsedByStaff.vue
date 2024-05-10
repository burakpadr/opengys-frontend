<template>
    <slot name="content"></slot>
</template>

<script>
import { parseToken, removeToken } from "@/service/TokenService";

export default {
    name: "ViewUsedByStaff",
    mounted() {
        let decodedJwt = parseToken();

        if (!decodedJwt.isStaff) {
            removeToken();

            window.location.href = "/";
        }
    }
}
</script>