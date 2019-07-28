<template>
  <div>
    <h3 class="title-describe position-relative mb-4 pl-4 text-light-red">
        <slot></slot>
    </h3>
  </div>
</template>
<style lang="scss" scoped>
.title-describe {
  border-bottom: 1px solid #e8ddbf;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0.25rem;
    background-color: #e8ddbf;
  }
}
</style>
