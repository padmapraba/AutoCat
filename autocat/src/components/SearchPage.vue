<template>
  <v-container>
    

  <div class="text-center">
    <v-menu
      top
      :close-on-click="closeOnClick"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color=""
          light
          v-bind="attrs"
          v-on="on"
        >
          Price
        </v-btn>
      </template>

      <v-list>
        <!-- <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item> -->
        <v-card
          flat
          color="transparent"
        >
    <v-subheader>Price range</v-subheader>

    <v-card-text>
      <v-row>
        <v-col class="px-4">
          <v-range-slider
            v-model="range"
            :max="max"
            :min="min"
            hide-details
            class="align-center"
          >
            <template v-slot:prepend>
              <v-text-field
                :value="range[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :value="range[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
      </v-list>
    </v-menu>
  </div>

  </v-container>
</template>

<script>
  export default {
    name: 'SearchPage',

    data: () => ({
      
    }),
  }
</script>
