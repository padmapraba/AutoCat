<template>
  <v-container>
    <div>
      <v-row>
        <!-- price -->
        <v-col>
          <v-menu bottom :close-on-content-click=false>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="" light v-bind="attrs" v-on="on"> Price </v-btn>
            </template>

            <v-list>
              <!-- <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item> -->
              <v-card flat color="transparent">
                <v-subheader>Price range</v-subheader>

                <v-card-text>
                  <v-row>
                    <v-col class="px-4">
                      <v-range-slider
                        v-model="rangePrice"
                        v-on:change="onPriceChange"
                        :max="max"
                        :min="min"
                        style="width: 400px"
                        hide-details
                        class="align-center"
                      >
                        <template v-slot:prepend>
                          <v-text-field
                            :value="rangePrice[0]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                            @change="$set(rangePrice, 0, $event)"
                          ></v-text-field>
                        </template>
                        <template v-slot:append>
                          <v-text-field
                            :value="rangePrice[1]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                            @change="$set(rangePrice, 1, $event)"
                          ></v-text-field>
                        </template>
                      </v-range-slider>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-list>
          </v-menu>
        </v-col>

        <!-- make and model -->
        <v-col>
          <v-menu bottom :close-on-content-click=false>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="" light v-bind="attrs" v-on="on">
                Make & Model
              </v-btn>
            </template>

              <template>
                <v-item-group mulitple value=[] v-on:change="onMakeSelected">
                  <v-container>
                    <v-row rows="3">
                      <v-col cols="5" md="2">
                        <v-item
                          v-for="make in makes"
                          v-bind:key="make.make"
                          v-slot="{ active, toggle }"
                          >
                            <v-chip
                              v-bind:key="make.make"
                              active-class="red--text"
                              :input-value="active"
                              @click="toggle"
                            >
                              {{ make.make }}
                            </v-chip>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-item-group>
              </template>
         </v-menu>
        </v-col>

        <!-- body type -->
        <v-col>
          <v-menu bottom :close-on-content-click=false>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="" light v-bind="attrs" v-on="on"> Body Type </v-btn>
            </template>

            <v-list>
              <v-container>
                <v-row>
                  <v-col style="width: 300px">
                    Style
                    <v-autocomplete
                      v-model="values"
                      v-on:change="onStyleChange"
                      :items="items"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Style"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                  <v-col style="width: 300px">
                    Door
                    <v-slider
                      v-model="slider"
                      v-on:change="onDoorsChange"
                      step="1"
                      class="align-center"
                      :max="doorMax"
                      :min="doorMin"
                      :default="4"
                      hide-details
                      style="width: 150px"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="slider"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col style="width: 300px">
                    Drive
                    <v-autocomplete
                      v-model="values"
                      v-on:change="onDriveChange"
                      :items="items"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Drive"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                  <v-col style="width: 300px">
                    Seats
                    <v-slider
                      v-model="slider"
                      v-on:change="onSeatsChanged"
                      step="1"
                      class="align-center"
                      :max="seatsMax"
                      :min="seatsMin"
                      hide-details
                      style="width: 150px"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="slider"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>
              </v-container>
            </v-list>
          </v-menu>
        </v-col>

        <!-- features -->
        <v-col>
          <v-menu bottom :close-on-content-click=false>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="" light v-bind="attrs" v-on="on"> Features </v-btn>
            </template>

            <v-list>
              <v-container>
                <v-row>
                  <v-col style="width: 300px">
                    Safety
                    <v-slider
                      v-model="slider"
                      v-on:change="onSafetyChange"
                      step="1"
                      class="align-center"
                      :max="seatsMax"
                      :min="seatsMin"
                      hide-details
                      style="width: 150px"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="slider"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                  <v-col style="width: 300px">
                    Fuel
                    <v-autocomplete
                      v-model="values"
                      v-on:change="onFuelChange"
                      :items="items"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Fuel Type"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="width: 300px">
                    City MPG
                    <v-range-slider
                      v-model="rangeCity"
                      v-on:change="onCityMPGChange"
                      :max="cityMax"
                      :min="cityMin"
                      hide-details
                      class="align-center"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="rangeCity[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeCity, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="rangeCity[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeCity, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                  <v-col style="width: 300px">
                    Highway MPG
                    <v-range-slider
                      v-model="rangeHighway"
                      v-on:change="onHighwayMPGChange"
                      :max="highwayMax"
                      :min="highwayMin"
                      hide-details
                      class="align-center"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="rangeHighway[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeHighway, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="rangeHighway[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeHighway, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="width: 300px">
                    Horsepower
                    <v-range-slider
                      v-model="rangeHorsepower"
                      v-on:change="onHorsepowerChange"
                      :max="horsepowerMax"
                      :min="horsepowerMin"
                      hide-details
                      class="align-center"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="rangeHorsepower[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeHorsepower, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="rangeHorsepower[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeHorsepower, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                  <v-col style="width: 300px">
                    Cylinders
                    <v-autocomplete
                      v-model="values"
                      v-on:change="onCylindersChange"
                      :items="items"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Cylinders"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="width: 300px">
                    Engine Size
                    <v-autocomplete
                      v-model="values"
                      :items="items"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Engine Size"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                  <v-col style="width: 300px">
                    Engine Location
                    <v-container fluid>
                      <v-checkbox
                        v-model="selected"
                        label="Front"
                        value="front"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="selected"
                        label="Back"
                        value="back"
                      ></v-checkbox>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </div>

    <div>
        <template>
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="300"
          >

    <v-img
      height="200"
      src="@/assets/honda_accord.webp"
      
    ></v-img>

    <v-card-title>Make Model</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          Safety Rating
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • Price
      </div>

      <div>

        Website:
      </div>
    </v-card-text>
  </v-card>
  </template>

    </div>
  </v-container>
</template>


<script>
import { searchCars, getMakes, getCars } from '../api/api'

export default {
  name: "SearchPage",

  data: () => ({
    range: [10, 50],
    rangePrice: [0, 100000],
    rangeCity: [0, 100],
    rangeHighway: [0, 100],
    rangeHorsepower: [0, 200],
    min: 0,
    max: 100000,
    doorMin: 2,
    doorMax: 4,
    seatsMin: 2,
    seatsMax: 7,
    cityMin: 0,
    cityMax: 100,
    highwayMin: 0,
    highwayMax: 100,
    horsepowerMin: 0,
    horsepowerMax: 200,
    makes: [{make: "Ford"}],
    // styles: [],
    filteredCars: [{"make":"Ford","model":"Escape","price":"$25,555.00","safety_rating":5,"image_url":"https://www.ford.com/suvs-crossovers/escape/"}],
    filters: {
      priceMin: 0,
      priceMax: 100000,
      doorsMin: 2,
      seatsMin: 4,
      selectedMakes: [],
    }
  }),

  methods: {
    async searchCars(){
      const cars = await searchCars();
      console.log(cars);
    },
    
    async getMakes() {
      const makes = await getMakes();
      this.makes = makes.result;
    },

    onMakeSelected(event) {
      const makeText = this.makes[event].make;
      this.filters.selectedMakes.push(makeText);
    },

    onPriceChange(range){
      this.filters.priceMin = range[0];
      this.filters.priceMax = range[1];
    },

    onDoorsChange(value){
      this.filters.doorsMin = value;
      console.log(this.filters);
    },

    onSeatsChange(value){
      this.filters.seatsMin = value;
    },

    onSafetyChange(value) {
      this.filters.safety_rating = value;
    },

    onCityMPGChange(range) {
      this.filters.cityMin = range[0];
      this.filters.cityMax = range[1];
    },

    onHighwayMPGChange(range) {
      this.filters.highwayMin = range[0];
      this.filters.highwayMax = range[1];
    },

    onHorsepowerChange(range) {
      this.filters.horsepowerMin = range[0];
      this.filters.horsepowerMax = range[1];
    },

    onStyleChange(value){
      this.filters.style = value;
    },

    onDriveChange(value){
      this.filters.driveWheel = value;
    },

    onFuelChange(value){
      this.filters.fuelType = value;
    },

    onCylindersChange(value){
        this.filters.cylinders = value;
      },
    // NOT SURE IF THIS WORKS
    async filterCars() {
      const cars = await getCars();
      this.cars = cars.result;
    },

  },

  created() {
    this.searchCars();
    this.getMakes();
    this.filterCars();
  }
};
</script>
