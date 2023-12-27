const {
  NoticeCreateRequestDTO,
  NoticeFindRequestDTO,
  NoticeUpdateRequestDTO,
  NoticeDeleteRequestDTO,
} = require("./dto/notice.dto");

class NoticeController {
  constructor(service, Images) {
    this.service = service;
    this.images = Images;
  }

  async postNotice(req, res, next) {
    try {
      console.log(req.body);
      const noticeCreateRequestDTO = new NoticeCreateRequestDTO(req.body);
      const noticeCreateResponseDTO = await this.service.createNotice(
        noticeCreateRequestDTO
      );
      console.log(req.files);
      if (req.files) {
        const imagesData = req.files.map((file) => {
          let imageData = {
            Images_url: `${req.protocol}://${req.get("host")}/uploads/${
              file.filename
            }`,
          };

          if (noticeCreateResponseDTO.noticeId) {
            imageData.Notice_id = noticeCreateResponseDTO.noticeId;
          } else if (noticeCreateResponseDTO.boardId) {
            imageData.Boards_id = noticeCreateResponseDTO.boardId;
          }

          return imageData;
        });

        await this.images.bulkCreate(imagesData);
      }

      res.status(201).json(noticeCreateResponseDTO);
    } catch (e) {
      console.error("postNotice Error", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllNotice(req, res, next) {
    try {
      const noticeFindAllResponseDTO = await this.service.findAllNotice();
      res.status(200).json(noticeFindAllResponseDTO);
    } catch (e) {
      console.error("getAllNotice Error", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getNotice(req, res, next) {
    try {
      const noticeFindRequestDTO = new NoticeFindRequestDTO(req.params);
      const noticeFindResponseDTO = await this.service.findNotice(
        noticeFindRequestDTO
      );
      res.status(200).json(noticeFindResponseDTO);
    } catch (e) {
      console.error("getNotice Error", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async putNotice(req, res, next) {
    try {
      const noticeUpdateRequestDTO = new NoticeUpdateRequestDTO(req.body);
      const noticeUpdateResponseDTO = await this.service.updateNotice(
        noticeUpdateRequestDTO
      );
      res.status(200).json(noticeUpdateResponseDTO);
    } catch (e) {
      console.error("putNotice Error", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteNotice(req, res, next) {
    try {
      const noticeDeleteRequestDTO = new NoticeDeleteRequestDTO(req.body);
      const noticeDeleteResponseDTO = await this.service.deleteNotice(
        noticeDeleteRequestDTO
      );
      res.status(200).json(noticeDeleteResponseDTO);
    } catch (e) {
      console.error("deleteNotice Error", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = NoticeController;
