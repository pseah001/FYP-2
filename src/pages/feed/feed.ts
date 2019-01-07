import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
/*   items = []; */
  text: string = "";
  posts: any[] = [];
  pageSize: number = 10;
  cursor: any;
  infiniteEvent: any;
  image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private camera: Camera) {
/*     for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    } */
    this.getPosts();
  }
  getPosts(){
    //when new post is added, start will be a blank array. no continuous repeated posts when new post is added
    this.posts = [];

    let loading = this.loadingCtrl.create({
      content: "Loading Feed..."
    });

    loading.present();

    firebase.firestore().collection("posts").orderBy("created", "desc").limit(this.pageSize).get()
    .then((docs) => {

      docs.forEach((doc) => {
        this.posts.push(doc);
      })
      loading.dismiss();
      this.cursor = this.posts[this.posts.length - 1];

      console.log(this.posts)

    }).catch((err) => {
      console.log(err)
    })
  }

  loadMorePosts(event){

    firebase.firestore().collection("posts").orderBy("created", "desc").startAfter(this.cursor).limit(this.pageSize).get()
    .then((docs) => {

      docs.forEach((doc) => {
        this.posts.push(doc);
      })

      console.log(this.posts)

      if(docs.size < this.pageSize){
        // all documents have been loaded
        event.enable(false);
      } else {
        event.complete();
        this.cursor = this.posts[this.posts.length - 1];
      }

    }).catch((err) => {
      console.log(err)
    })

  }

  refresh(event){

    this.posts = [];

    this.getPosts();
    
    if(this.infiniteEvent){
      this.infiniteEvent.enable(true);
    }

    event.complete();

  }

  post(){

    firebase.firestore().collection("posts").add({
      text: this.text,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: firebase.auth().currentUser.uid,
      owner_name: firebase.auth().currentUser.displayName
    }).then(async (doc) => {
      console.log(doc)

      //if image is present, upload to firebase. await for promise in upload() to complete before proceeding
      if (this.image) {
        await this.upload(doc.id)
      }

      //clear whats written in post after it has been posted
      this.text = "";

      //hide image preview once uplaoded
      this.image = undefined;

      let toast = this.toastCtrl.create({
        message: "Your post has been created successfully.",
        duration: 3000
      }).present();


      this.getPosts();
    }).catch((err) => {
      console.log(err)
    })

  }

  ago(time){
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }

/*   doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

 */
addPhoto(){

  this.launchCamera();

}
// camera
launchCamera(){
  let options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    targetHeight: 512,
    targetWidth: 512,
    allowEdit: true
  }

  this.camera.getPicture(options).then((base64Image) => {
    console.log(base64Image);
    //assigning image to (base64Image) in the form of png. image is tagged in html, thus displaying photo after its taken
    this.image = "data:image/png;base64," + base64Image;
  }).catch((err) => {
    console.log(err)
  })
}
//upload photo as string to firebase storage
upload(name: string){
  //carry out promise and end with a resolve after completion
  return new Promise((resolve, reject) => {

    let loading = this.loadingCtrl.create({
      content: "Uploading Image..."
    })

    loading.present();

    let ref = firebase.storage().ref("Posts/" + name);
    //splits image into array length: 2. Using uploadTask[1]
    let uploadTask = ref.putString(this.image.split(',')[1], "base64");

    //state_changed event fired whenever theres an upload
    uploadTask.on("state_changed", (taskSnapshot: any) => {
      console.log(taskSnapshot)
      let percentage = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100;
      loading.setContent("Uploaded " + percentage + "% ...")

    }, (error) => {
      console.log(error)
    }, () =>{
      console.log("The upload is complete!");
      //get photo download URL
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        //link photo in storage to corresponding post in firestore by updating
        firebase.firestore().collection("posts").doc(name).update({
          image: url
        }).then(() => {
          loading.dismiss()
          resolve()
        }).catch((err) => {
          loading.dismiss()
          reject()
        })

      }).catch((err) => {
        loading.dismiss()
        reject()
      })

    })

  })



}


}
