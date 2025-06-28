require('../models/database');
const Popularblog = require('../models/Popularblog');
const Latestblog = require('../models/Latestblog');


/**
 * Get /
 * Homepage
 */
exports.homepage = async(req, res) => {
try{
    const limitNumber = 5;
    const pop = await Popularblog.find({}).limit(limitNumber);
    const latest = await Latestblog.find({}).limit(limitNumber);
    

    const roam = { pop };
    const ride = { latest };

res.render('index' , { title: 'Travel Blog - Home', roam, ride } );
} catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
}
}


/**
 * Get /travel/:id
 * Popular
 */

exports.explorePopularblog = async(req, res) => {
    try{
     let popularblogId = req.params.id;
     const popularblog = await Popularblog.findById(popularblogId);
    res.render('popularblog' , { title: 'Travel Blog - Roam', popularblog  } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
    }


    /**
 * Get /travel/:id
 * Latest
 */
    exports.exploreLatestblog = async(req, res) => {
        try{
         let latestblogId = req.params.id;
         const latestblog = await Latestblog.findById(latestblogId);
        res.render('latestblog' , { title: 'Travel Blog - Ride', latestblog  } );
        } catch (error) {
            res.status(500).send({message: error.message || "Error Occured" });
        }
        }


        /**
 * Post /travel/:id
 * Search
 */
exports.searchPlace = async(req, res) => {
    try{
      let searchTerm = req.body.searchTerm;
      let popularblog = await Popularblog.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search' , { title: 'Travel Blog - Search', popularblog} );
    }  catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}


//button popular
exports.explorePopular = async(req, res) => {
    try{
     const limitNumber = 20;
     const popularblog = await Popularblog.find({}).limit(limitNumber);
    res.render('explore-popular' , { title: 'Travel Blog - Explore Popular', popularblog  } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
    }


    exports.exploreLatest = async(req, res) => {
        try{
         const limitNumber = 20;
         const latestblog = await Latestblog.find({}).sort({_id: -1}).limit(limitNumber);
        res.render('explore-latest' , { title: 'Travel Blog - Explore Latest', latestblog  } );
        } catch (error) {
            res.status(500).send({message: error.message || "Error Occured" });
        }
        }
    


 /**
 * Get /submit-blog
 * Submit Form
 */
 exports.submitBlog = async(req, res) => {
 const infoErrorsObj = req.flash('infoErrors');
 const infoSubmitObj = req.flash('infoSubmit');

    res.render('submit-blog' , { title: 'Travel Blog - Submit Blog',infoErrorsObj, infoSubmitObj } );
   

 }

/**
 * Post /submit-blog
 * Submit Form
 */
 exports.submitBlogOnPost = async(req, res) => {

    try{

       let imageUploadFile;
       let uploadPath;
       let newImageName;

       if(!req.files || Object.keys(req.files).length === 0){
        console.log('No files were uploaded.');
       } else{
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;

        uploadPath = require('path').resolve('./') + '/public/uploads' + newImageName;

        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
       }



        const newBlog = new Latestblog({
            name: req.body.name,
            description: req.body.description,
            image: newImageName,
            email: req.body.email
        });
        

        await newBlog.save();

        req.flash('infoSubmit', 'Your Blog has been added.')
        res.redirect('/submit-blog' );
    } catch (error){
        req.flash('infoErrors',error);
        res.redirect('/submit-blog');
    }
 }


 exports.renderUpdateLatestBlog = async (req, res) => {
    try {
        const latestblogId = req.params.id;
        const latestblog = await Latestblog.findById(latestblogId);
        if (!latestblog) {
            return res.status(404).send('Blog not found');
        }
        res.render('update-latestblog', { latestblog });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error occurred' });
    }
};



// New controller function for handling form submission to update blog
exports.updateLatestBlog = async (req, res) => {
    try {
        const latestblogId = req.params.id;
        const { name, description, email } = req.body;

        const latestblog = await Latestblog.findById(latestblogId);
        if (!latestblog) {
            return res.status(404).send('Blog not found');
        }

        latestblog.name = name;
        latestblog.description = description;
        latestblog.email = email;

        await latestblog.save();

        res.redirect('/'); // Redirect to homepage or wherever appropriate
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error occurred' });
    }
};

exports.renderDeleteLatestBlog = async (req, res) => {
    try {
        const latestblogId = req.params.id;
        const latestblog = await Latestblog.findById(latestblogId);
        if (!latestblog) {
            return res.status(404).send('Blog not found');
        }
        res.render('delete-latestblog', { latestblog });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error occurred' });
    }
};

// Controller function for handling the deletion of the blog post
exports.deleteLatestBlog = async (req, res) => {
    try {
        const latestblogId = req.params.id;

        // Delete the blog post
        await Latestblog.findByIdAndDelete(latestblogId);

        // Redirect to the homepage or another appropriate page
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error occurred' });
    }
};




