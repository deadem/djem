<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div>
                  <div>Hello {{name}}{{exclamationMarks}}</div>
                  <button @click="decrement">-</button>
                  <button @click="increment">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class HelloDecorator extends Vue {
    @Prop() name: string;
    @Prop() initialEnthusiasm: number;
    enthusiasm = this.initialEnthusiasm;
    increment() {
        this.enthusiasm++;
    }
    decrement() {
        if (this.enthusiasm > 1) {
            this.enthusiasm--;
        }
    }
    get exclamationMarks(): string {
        return Array(this.enthusiasm + 1).join('!');
    }
}
</script>
