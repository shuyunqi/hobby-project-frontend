var src = './src';
var dest = './_newBuild';

module.exports = {
  less:{
    src: src+'/less/**/*.less',
    dest: dest + "/css",
  },
  image:{
    src: src + "/assert/**/*",
    dest: dest + "/img",

  },
  index:{
    src: src + "/index.html",
    dest: dest
  },
  html:{
    src1: src +"/lib/**/*.html",
    src2: src +"/modules/**/*.html",
    dest: dest+ "/js"
  },
  js:{
    src: src + "/**/*.js",
    dest: dest + "/js"
  },
  vendor:{
    src: src+"/vendor/**/*.js",
    dest: dest + "/vendor"
  },
  clean:{
    src: dest
  },
  fonts:{
    src: src+"/fonts/*",
    dest: dest+"/fonts"
  }
}