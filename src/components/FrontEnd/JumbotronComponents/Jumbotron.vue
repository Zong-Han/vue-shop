<template>
  <section class="jumbotron jumbotron-fluid pt-0 pb-0 mt-3 text-light-red">
    <div class="position-relative text-center">
      <slot name="jumbotron-img"></slot>
      <slot name="title"></slot>
      <slot name="subtitle"></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>

%jumbotron-background {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.jumbotron {
  margin-bottom: 0;
  background-color: transparent;
  overflow: hidden;

  .jumbotron-bg,
  .jumbotron-subbg {
    @extend %jumbotron-background;
    height: 350px;
  }

  .jumbotron-bg {
    background-image: url("../../../assets/image/jumbotron-img.jpg");
  }

  .jumbotron-subbg {
    background-image: url("../../../assets/image/jumbotron-img2.jpg");
  }

  .title,
  .sub-title {
    font-size: 1rem;
  }

  .sub-title {
    color: transparent;
    background: linear-gradient(
      to right,
      #aa02f8 0%,
      #0330f7 80%,
      #005564 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
  }

  @media (min-width: 768px) {
    .jumbotron-bg,.jumbotron-subbg {
      height: 700px;
    }

    .title {
      position: absolute;
      left: 1.2rem;
      top: 50%;
      max-width: 100%;
      transform: translateY(-50%);
    }

    .title,
    .sub-title {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 992px) {
    .title,
    .sub-title {
      font-size: 2rem;
    }
    .sub-title {
      position: absolute;
      top: 60%;
      left: 5%;
    }
  }

  @media (min-width: 1200px) {
    .title {
      writing-mode: horizontal-tb;
    }
    .title,
    .sub-title {
      font-size: 2.5rem;
    }
  }
}
</style>
