const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one tag
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found.' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new tag
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_nam: req.body.tag_name
  })
    .then((tagData) => res.json(tagData))
    .catch((err) => {
      res.json(err);
    });
});

// update tag
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    })
    .then((tag) => {
      res.json(ProductTag);
    })
    .catch((err) => res.json(err));
});

// delete tag
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      res.json(productTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
