import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { FirebaseService } from '../service/firebase.service';
@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  myphoto:any;
  loading;
  currentImage;
  selectedPhoto: Blob;
  photos: string[];
  someTextUrl;


  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public loadingCtrl: LoadingController
    , public imagePicker: ImagePicker,
    public cropService: Crop,public toastCtrl: ToastController, public firebaseService: FirebaseService,public actionSheetCtrl: ActionSheetController,) {
    this.getSomeText();

  }


  getSomeText() {
    firebase.storage().ref().child('images/uploaded.jpeg').getDownloadURL()
      .then(response => this.someTextUrl = response)
      .catch(error => console.log('error', error))
  }
//take photo function
async takephoto(){

    //captured photo info
    const options: CameraOptions = {
      quality:70,
      targetHeight: 200,
      targetWidth:200,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }



 this.camera.getPicture(options).then((imageData) => {
/*   console.log('hi');
    this.photos = new Array<string>();
    this.cropService
    .crop(imageData, {quality: 75})
    .then((newImage) => {
      this.photos.push(newImage);
    });
    console.log('hi2'); */
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  this.loading.present();

  this.selectedPhoto = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
  this.upload(); 

}, (err) => {
  console.log('error', err);
}); 

}

dataURItoBlob(dataURI) {
  // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
  let binary = atob(dataURI.split(',')[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
};
//uploading to firebase
upload() {
  if (this.selectedPhoto) {
    var uploadTask = firebase.storage().ref('feed').child('uploaded.jpeg').put(this.selectedPhoto);
    uploadTask.then(this.onSuccess, this.onError);
  }
}
onSuccess = snapshot => {
  this.currentImage =snapshot.ref.getDownloadURL();
  this.loading.dismiss();
  console.log("bye");
};

onError = error => {
  console.log("error", error);
  this.loading.dismiss();
};

//Gallery button
presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Choose or take a picture',
    buttons: [
      {
        text: 'Take a picture',
        handler: () => {
          this.takephoto();
        }
      },
      {
        text: 'Gallery',
        handler: () => {
          this.openImagePicker();
        }
      }
    ]
  });
  actionSheet.present();
}

openImagePicker(){
  let options = {
    maximumImagesCount: 1,
  }
  this.photos = new Array<string>();
  this.imagePicker.getPictures(options)
  .then((results) => {
    this.reduceImages(results).then(() => {
      
  this.selectedPhoto = this.dataURItoBlob('data:image/jpeg;base64,' + results);
  this.upload(); 
      console.log('all images cropped!!');
    });
  }, (err) => { console.log(err) });
}
//crop indiv image
reduceImages(selected_pictures: any) : any{
  return selected_pictures.reduce((promise:any, item:any) => {
    return promise.then((result) => {
      return this.cropService.crop(item, {quality: 75}).then(cropped_image => this.photos.push(cropped_image));
    });
  }, Promise.resolve());

  
}

takePicture(){
  let options = {
    quality: 100,
    correctOrientation: true
  };

  //crop
  this.camera.getPicture(options)
  .then((data) => {
    this.photos = new Array<string>();
    this.cropService
    .crop(data, {quality: 75})
    .then((newImage) => {
      this.photos.push(newImage);
    }, error => console.error("Error cropping image", error));
  }, function(error) {
    console.log(error);
  });


  
}

/*
openImagePickerCrop(){
  this.imagePicker.hasReadPermission().then(
    (result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.cropService.crop(results[i], {quality: 75}).then(
                newImage => {
                  this.uploadImageToFirebase(newImage);
                },
                error => console.error("Error cropping image", error)
              );
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
}

uploadImageToFirebase(image){
  image = normalizeURL(image);

  //uploads img to firebase storage
  this.firebaseService.uploadImage(image)
  .then(photoURL => {
    
    let toast = this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    toast.present();
    })
}
*/


/*getimage(){
  const options: CameraOptions = {
    quality:70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:false
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
  this.myphoto = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });
*/



}
