import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { Posts } from '../entity/posts.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@ApiTags('posts')
@Controller({
  path: '/posts',
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<Posts[]> {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  addPost(@Request() req, @Body() post: Posts): Promise<Posts> {
    const username = req.user.username;
    return this.postService.addPost(post, username);
  }

  @Get(':id')
  findPost(@Param('id') id: number): Promise<Posts> {
    return this.postService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/usuario/my')
  @ApiBearerAuth()
  findByUsuario(@Request() req) {
    const username = req.user.username;
    return this.postService.findByUsuario(username);
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() post: Posts): Promise<Posts> {
    return this.postService.updatePost(id, post);
  }

  @Delete(':id')
  deletPost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
