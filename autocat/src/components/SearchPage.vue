<template>
	<v-container>

		<div>
			<v-menu bottom :close-on-click="closeOnClick">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="" light v-bind="attrs" v-on="on">
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
					<v-card flat color="transparent">
						<v-subheader>Price range</v-subheader>

						<v-card-text>
							<v-row>
								<v-col class="px-4">
									<v-range-slider v-model="range" 
                  :max="max" 
                  :min="min" 
                  style="width: 400px" 
                  hide-details class="align-center">
										<template v-slot:prepend>
											<v-text-field 
                      :value="range[0]" 
                      class="mt-0 pt-0" 
                      hide-details single-line 
                      type="number" 
                      style="width: 60px" 
                      @change="$set(range, 0, $event)"></v-text-field>
										</template>
										<template v-slot:append>
											<v-text-field :value="range[1]" 
                      class="mt-0 pt-0" 
                      hide-details 
                      single-line 
                      type="number" 
                      style="width: 60px" 
                      @change="$set(range, 1, $event)"></v-text-field>
										</template>
									</v-range-slider>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-list>
			</v-menu>
      </div>

      <div>
      <v-menu bottom :close-on-click="closeOnClick">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="" 
          light 
          v-bind="attrs" 
          v-on="on">
						Make & Model
					</v-btn>
				</template>

        <v-list>
          

          <v-app id="inspire">
      <v-container fluid>
      <!-- <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      > -->
      <v-data-iterator>
        <template v-slot:header>
          <v-toolbar
            dark
            color="red"
            class="mb-1"
          >
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search for makes"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
            </template>
          </v-toolbar>
        </template>
  
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  {{ item.name }}
                </v-card-title>
  
                <v-divider></v-divider>
  
                <v-list dense>
                  <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
                  >
                    
            
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </v-app>
        </v-list>
      </v-menu>
      </div>


    <div>
      <v-menu bottom :close-on-click="closeOnClick">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="" light v-bind="attrs" v-on="on">
						Body Type
					</v-btn>
				</template>

        <v-list>
          <v-container>
            <v-row>
              <v-col style="width: 300px">
                Style
                <v-autocomplete
                  v-model="values"
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
    </div>

    <div>
      <v-menu bottom :close-on-click="closeOnClick">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="" light v-bind="attrs" v-on="on">
						Features
					</v-btn>
				</template>

        <v-list>
          <v-container>
            <v-row>
              <v-col style="width: 300px">
                Safety
               <v-slider
                v-model="slider"
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
                <v-range-slider v-model="range" 
                  :max="cityMax" 
                  :min="cityMin" 
                
                  hide-details class="align-center">
										<template v-slot:prepend>
											<v-text-field 
                      :value="range[0]" 
                      class="mt-0 pt-0" 
                      hide-details single-line 
                      type="number" 
                      style="width: 60px" 
                      @change="$set(range, 0, $event)"></v-text-field>
										</template>
										<template v-slot:append>
											<v-text-field :value="range[1]" 
                      class="mt-0 pt-0" 
                      hide-details 
                      single-line 
                      type="number" 
                      style="width: 60px" 
                      @change="$set(range, 1, $event)"></v-text-field>
										</template>
									</v-range-slider>
               
              </v-col>
              <v-col style="width: 300px">
                Highway MPG
                <v-range-slider v-model="value" 
                  :max="highwayMax" 
                  :min="highwayMin" 
                  hide-details class="align-center">
										<template v-slot:prepend>
											<v-text-field 
                      :value="rangeHighway[0]" 
                      class="mt-0 pt-0" 
                      hide-details single-line 
                      type="number" 
                      style="width: 60px" 
                      @change="$set(range, 0, $event)"></v-text-field>
										</template>
										<template v-slot:append>
											<v-text-field :value="rangeHighway[1]" 
                      class="mt-0 pt-0" 
                      hide-details 
                      single-line 
                      type="number" 
                      style="width: 60px" 
                      @change="$set(range, 1, $event)"></v-text-field>
										</template>
									</v-range-slider>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="width: 300px">
                Horsepower
                
              </v-col>
              <v-col style="width: 300px">
                Cylinders
                
              </v-col>
            </v-row>

            <v-row>
              <v-col style="width: 300px">
                Engine Size
                
              </v-col>
              <v-col style="width: 300px">
                Engine Location
                
              </v-col>
            </v-row>
            
          </v-container>
        </v-list>
      </v-menu>

    </div>

	</v-container>
</template>

<script>
export default {
	name: "SearchPage",

	data: () => ({
    range: [10, 50],
		rangePrice: [0, 100000],
    rangeCity: [0, 100],
    rangeHighway: [0,100],
		min: 0,
		max: 100000,
    doorMin: 2,
    doorMax: 4,
    seatsMin: 2,
    seatsMax: 7,
    cityMin: 0,
    cityMax: 100,
    highwayMin: 0,
    highwayMax: 100
	}),
};
</script>
