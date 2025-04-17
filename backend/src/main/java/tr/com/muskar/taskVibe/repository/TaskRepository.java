package tr.com.muskar.taskVibe.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import tr.com.muskar.taskVibe.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
