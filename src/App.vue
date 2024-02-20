<template>
  <div class="content">
    <div class="centered">
      <h1>Pranayby Watch!</h1>
      <div class="stacked">
        <button v-if="!buttonPressed" id="foundBtn" @click="getLocation" type="button" class="btn btn-primary btn-lg">I see Pranay!</button>
        <iframe :src="iframeSrc" width="800" height="600" frameborder="0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <p v-if="buttonPressed" class="thanks-msg">Thanks soldier! 😊</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { doc, getDoc, updateDoc, GeoPoint } from "firebase/firestore";

const docRef = doc(db, "location", "pranay");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}


export default {
  data() {
    return {
      latitude: null,
      longitude: null,
      buttonPressed: false,
    };
  },
  async created() {
    try {
      const docRef = doc(db, "location", "pranay");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        this.latitude = data.coordinates._lat;
        this.longitude = data.coordinates._long;
        console.log(data.coordinates);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  },
  computed: {
    iframeSrc() {
      if (this.latitude !== null && this.longitude !== null) {
        return `https://www.google.com/maps/embed/v1/place?key=AIzaSyA40dC72gCgk1a96UGpbvxlyx3z67pmPuE&q=${this.latitude}+${this.longitude}`;
      } else {
        return '';
      }
    }
  },
  methods: {
    async getLocation() {
    try {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const crd = position.coords;
        const latitude = crd.latitude;
        const longitude = crd.longitude;
        const timestamp = new Date().toISOString();
        
        // Create a GeoPoint object using latitude and longitude
        const geoPoint = new GeoPoint(
          latitude,
          longitude
        );
        const docRef = doc(db, "location", "pranay");
        await updateDoc(docRef, {
          timestamp: timestamp,
          coordinates: geoPoint
        });
        console.log("db updated!")

        this.buttonPressed = true;
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } catch (error) {
    console.error("Error getting location:", error);
  }
},

  },
};
</script>



<style scoped>
.content {
  display: flex;
  justify-content: center; /* horizontally center */
  align-items: center; /* vertically center */
  height: 100vh; /* set height to viewport height */
}

.centered {
  text-align: center;
}
.stacked {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>