Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },

  /*
  authors: {
    type: Array,
    optional: true,
  },
  'authors.$': {
    type: Object,
  },
  'authors.$.author': {
    type: String,
    label: "Author"
  },
  */
}));

if ( Meteor.isClient) {
    Template.registerHelper("Books", function() {
        return Books.find();
    });
    Template.chooseBook.helpers({ 
           "PreviousTitles":  function() {
                return Books.find().map(function (c) {
                      return {label: c.title, value: c._id};
                });
            }
    })
    Template.chooseBook.events({ 
        'change #choice': function(event, template) {
            Session.set("chosenBook", event.target.value);
        }
    });


    Template.updateBook.helpers({
        chosenBook: function() {
            return Books.findOne({_id: Session.get("chosenBook")});
        }
    });
}
